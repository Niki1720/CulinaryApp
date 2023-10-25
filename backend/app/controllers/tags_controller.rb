class TagsController < ApplicationController
  load_and_authorize_resource

  def index
  end

  def show
  end

  def create
    @tag.save!
  end

  def update
    @tag.update!(tag_params)
  end

  def destroy
    @tag.destroy
  end

  private

  def tag_params
    params.require(:tag).permit(:name)
  end
end
