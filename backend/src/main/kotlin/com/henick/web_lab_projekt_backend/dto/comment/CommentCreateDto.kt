package com.henick.web_lab_projekt_backend.dto.comment

import com.henick.web_lab_projekt_backend.dto.post.PostCreateCommentDto

data class CommentCreateDto(
    val username: String,
    val content: String,
    val post: PostCreateCommentDto
)
