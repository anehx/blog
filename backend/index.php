<?php

require_once 'models/Post.class.php';
require_once 'models/User.class.php';

header("Content-Type: application/json");
//echo json_encode(Post::findAll());
//echo json_encode(Post::find(array('id' => 1)));
echo json_encode(User::findAll());
exit;
