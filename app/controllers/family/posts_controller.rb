class Family::PostsController < AuthorizedController
  before_action :get_post, only: [:show, :update, :destroy]

  def index
    render json: Family::Post.order(id: :desc), each_serializer: FamilyPostSerializer
  end

  def show
    render json: @post
  end

  def create
    @post = Family::Post.new(post_params)
    if @post.save
      render json: @post, serializer: FamilyPostSerializer
    else
      render :json => { errors: @post.errors }, :status => :bad_request
    end
  end

  def update
    if @post.update(post_params)
      render json: @post, serializer: FamilyPostSerializer
    else
      render :json => { errors: @post.errors }, :status => :bad_request
    end
  end

  def destroy
    @post.destroy
    render json: @post, serializer: FamilyPostSerializer
  end

  private

    def post_params
      params.require(:post).permit(:title, :content, :picture, :family_topic_id)
    end

    def get_post
      @post = Family::Post.find(params[:id])
    end
end
