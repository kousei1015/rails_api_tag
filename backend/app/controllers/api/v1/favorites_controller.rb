class Api::V1::FavoritesController < ApplicationController
  before_action :authenticate_user!

  def index
    @favorites = current_user.favorites.includes(:post)
  end

  def create
    @favorite = Favorite.new(post_id: params[:post_id], user_id: current_user.id)
    @post = @favorite.post
    render 'create.json.jbuilder', status: @favorite.save ? :created : :unprocessable_entity
  end

  def destroy
    @favorite = current_user.favorites.find(params[:id])
    @favorite.destroy
    head :no_content
  end
end
