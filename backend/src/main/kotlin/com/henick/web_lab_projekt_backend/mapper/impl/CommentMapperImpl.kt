package com.henick.web_lab_projekt_backend.mapper.impl

import com.henick.web_lab_projekt_backend.dto.comment.CommentCreateDto
import com.henick.web_lab_projekt_backend.dto.comment.CommentDto
import com.henick.web_lab_projekt_backend.entity.Category
import com.henick.web_lab_projekt_backend.entity.Comment
import com.henick.web_lab_projekt_backend.entity.Post
import com.henick.web_lab_projekt_backend.mapper.CommentMapper
import com.henick.web_lab_projekt_backend.mapper.PostMapper
import org.springframework.stereotype.Component

@Component
class CommentMapperImpl(private val postMapper: PostMapper) : CommentMapper{
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
            post = Post("", "", "", Category(""))
        )
    }

    override fun mapToCreateDto(comment: Comment): CommentCreateDto {
        val post = postMapper.mapToCreateCommentDto(comment.post)
        return CommentCreateDto(
            username = comment.username,
            content = comment.content,
            post = post
        )
    }

    override fun mapFromCreateDto(commentDto: CommentCreateDto): Comment {
        val postDto = postMapper.mapFromCreateCommentDto(commentDto.post)
        return Comment(
            username = commentDto.username,
            content = commentDto.content,
            post = postDto
        )
    }
}