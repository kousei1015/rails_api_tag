json.array! @favorites do |favorite|
  json.id favorite.id
  json.user_id favorite.user_id
  json.post_id favorite.post_id
  json.title favorite.post.title
  json.tags favorite.post.tags
  json.created_at favorite.created_at
  json.updated_at favorite.updated_at
end