class UsersController < ApplicationController
  
  def index
    return nil if params[:keyword] == ""
    @users = User.where(['name LIKE ?', "%#{params[:keyword]}%"] ).where.not(id: current_user.id).limit(10)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
  end

  def update
    @group = Group.find(params[:id])
    if current_user.update(user_params)
       redirect_to group_messages_path(@group)
    else
      render :edit
    end
  end


  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
