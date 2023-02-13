class Api::V1::PostsController < ApplicationController
  
  def index
    @posts = Post.all
    @tags = Tag.all
  end

  def create
    post = Post.new(post_params)
  
    if post.save
      tags = params[:tags]
      if tags.present?
        tags.split(',').each do |tag_name|
          post.tags << Tag.find_or_create_by(name: tag_name)
        end
      end
  
      render json: { status: 'SUCCESS', message: 'Saved post', data: post }, status: :ok
    else
      render json: { status: 'ERROR', message: 'Post not saved', data: post.errors }, status: :unprocessable_entity
    end
  end

  def update
    post = Post.find(params[:id])
    if post.update(post_params)
      tags = params[:tags].split(",")
      post.taggings.destroy_all
      tags.each do |tag|
        post.taggings.create(tag: Tag.find_or_create_by(name: tag.strip))
      end
      render json: post, status: :ok
    else
      render json: post.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    head :no_content
  end

  def show
    @post = Post.find(params[:id])
    render :show
  end

  private

  def post_params
    params.permit(:title)
  end
end
