class TagsController < ApplicationController
  before_action :set_tag, only: %w[ show update destroy ]

  def index
    @tags = Tag.all
  end

  def show
  end

  def create
    @tag = Tag.new(tag_params)
    @tag.save!
    render :show, status: :created
  end

  def update
    @tag.update!(tag_params)
    render :show, status: :ok
  end

  def destroy
    @tag.destroy
  end

  private

  def set_tag
    @tag = Tag.find(params[:id])
  end

  def tag_params
    params.require(:tag).permit(:name)
  end
end
