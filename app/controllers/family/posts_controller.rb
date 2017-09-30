class Family::PostsController < AuthorizedController
  before_action :get_post, only: [:show, :update, :destroy, :like_action]

  def index
    render json: Family::Post.order(id: :desc), each_serializer: FamilyPostSerializer
  end

  def favorite_list
    render json: Family::Post.order(like_count: :desc), each_serializer: FamilyPostSerializer
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

  def like_action
    likes = []
    if @post.likes.present?
      likes = @post.likes
    end
    unless likes.include? current_user.id
      likes << current_user.id
      @post.update_attribute(:likes, likes)
  
      like_count = 0
      if @post.like_count.present? && @post.like_count > 0
        like_count = @post.like_count
      end
      @post.update_attribute(:like_count, like_count + 1)
    end
    render json: @post, serializer: FamilyPostSerializer
  end

  def destroy
    @post.destroy
    render json: @post, serializer: FamilyPostSerializer
  end

  private

    def post_params
      params.require(:post).permit(:title, :content, :picture, :family_topic_id, :trending)
    end

    def get_post
      @post = Family::Post.find(params[:id])
    end
end
