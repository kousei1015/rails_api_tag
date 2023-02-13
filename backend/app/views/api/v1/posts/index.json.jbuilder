json.array! @posts do |post|
  json.extract! post, :id, :title, :created_at, :updated_at
  json.tags post.tags, :name
end