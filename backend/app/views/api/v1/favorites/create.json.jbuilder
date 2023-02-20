json.message @favorite.save ? 'SUCCESS' : 'ERROR'
if @favorite.save
  json.data do
  json.id @favorite.id
  json.user_id @favorite.user_id
  json.post_id @favorite.post_id
  json.title @post.title
  json.tags @post.tags
  end
else
  json.data @favorite.errors
end