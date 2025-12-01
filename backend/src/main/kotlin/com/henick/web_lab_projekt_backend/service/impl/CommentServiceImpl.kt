package com.henick.web_lab_projekt_backend.service.impl

import com.henick.web_lab_projekt_backend.entity.Comment
import com.henick.web_lab_projekt_backend.repository.CommentRepository
import com.henick.web_lab_projekt_backend.service.CommentService
import org.springframework.stereotype.Service

@Service
class CommentServiceImpl(private val commentRepository: CommentRepository) : CommentService{
    override fun getAllCommentsForPost(postId: Long): List<Comment> {
        return commentRepository.getCommentsByPostId(postId)
    }
}