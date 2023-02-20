json.message @post.save ? 'SUCCESS' : 'ERROR'
if @post.save
  json.data do
  json.id @post.id
  json.title @post.title
  json.tags @post.tags
  json.created_at @post.created_at
  json.updated_at @post.updated_at
  end
else
  json.data @post.errors
end