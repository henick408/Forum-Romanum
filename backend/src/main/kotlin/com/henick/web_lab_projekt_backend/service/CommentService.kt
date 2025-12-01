package com.henick.web_lab_projekt_backend.service

import com.henick.web_lab_projekt_backend.entity.Comment

interface CommentService {
    fun getAllCommentsForPost(postId: Long): List<Comment>
}