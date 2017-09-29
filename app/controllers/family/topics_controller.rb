class Family::TopicsController < AuthorizedController
  before_action :get_topic, only: [:show, :update, :destroy]

  def index
    render json: Family::Topic.order(id: :desc)
  end

  def show
    render json: @topic
  end

  def create
    @topic = Family::Topic.new(topic_params)
    if @topic.save
      render json: @topic
    else
      render :json => { errors: @topic.errors }, :status => :bad_request
    end
  end

  def update
    if @topic.update(topic_params)
      render json: @topic
    else
      render :json => { errors: @topic.errors }, :status => :bad_request
    end
  end

  def destroy
    @topic.destroy
    render json: @topic
  end

  private

    def topic_params
      params.require(:topic).permit(:title, :picture)
    end

    def get_topic
      @topic = Family::Topic.find(params[:id])
    end
end
