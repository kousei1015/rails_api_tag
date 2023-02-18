class Api::V1::FavoritesController < ApplicationController
  before_action :authenticate_user!

  def index
    @favorites = current_user.favorites.includes(:post)
  end

  def create
    favorite = Favorite.new(post_id: params[:post_id], user_id: current_user.id)
    if favorite.save
      render json: { status: 'SUCCESS', data: favorite }
    else
      render json: { status: 'ERROR', data: favorite.errors }
    end
  end

  def destroy
    favorite = current_user.favorites.find(params[:id])
    favorite.destroy
    head :no_content
  end
end
