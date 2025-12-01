package com.henick.web_lab_projekt_backend.mapper

import com.henick.web_lab_projekt_backend.dto.CommentDto
import com.henick.web_lab_projekt_backend.entity.Comment

interface CommentMapper {
    fun mapToDto(comment: Comment): CommentDto
    fun mapFromDto(commentDto: CommentDto): Comment
}