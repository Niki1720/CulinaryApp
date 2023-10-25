class ApplicationController < ActionController::API
  respond_to :json
  before_action :set_default_request_format, :authenticate_user!
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from CanCan::AccessDenied, with: :access_denied

  def access_denied
    render json: { error: 'access_denied' }, status: :forbidden
  end
  def record_not_found
    render json: { error: 'not_found' }, status: :not_found
  end
  def set_default_request_format
    request.format = :json unless params[:format]
    headers['Access-Control-Allow-Headers'] = 'Authorization'
  end
end