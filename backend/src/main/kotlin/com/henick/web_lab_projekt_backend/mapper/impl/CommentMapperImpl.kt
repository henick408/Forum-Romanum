package com.henick.web_lab_projekt_backend.mapper.impl

import com.henick.web_lab_projekt_backend.dto.CommentDto
import com.henick.web_lab_projekt_backend.entity.Comment
import com.henick.web_lab_projekt_backend.mapper.CommentMapper
import org.springframework.stereotype.Component

@Component
class CommentMapperImpl : CommentMapper{
    override fun mapToDto(comment: Comment): CommentDto {
        return CommentDto(
            username = comment.username,
            content = comment.content,
            createdAt = comment.createdAt,
            id = comment.id
        )
    }

    override fun mapFromDto(commentDto: CommentDto): Comment {
        return Comment(
            username = commentDto.username,
            content = commentDto.content,
            createdAt = commentDto.createdAt,
            id = commentDto.id,
            post = null
        )
    }
}