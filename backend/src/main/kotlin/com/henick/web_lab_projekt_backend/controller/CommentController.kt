package com.henick.web_lab_projekt_backend.controller

import com.henick.web_lab_projekt_backend.dto.comment.CommentCreateDto
import com.henick.web_lab_projekt_backend.dto.comment.CommentDto
import com.henick.web_lab_projekt_backend.mapper.CommentMapper
import com.henick.web_lab_projekt_backend.service.CommentService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.net.URI

@RestController
@RequestMapping("/api/comments")
class CommentController(private val commentService: CommentService, val commentMapper: CommentMapper) {



    @PostMapping
    fun createComment(@RequestBody commentDto: CommentCreateDto): ResponseEntity<CommentDto> {
        val comment = commentMapper.mapFromCreateDto(commentDto)
        val createdComment = commentService.create(comment)
        val outputCommentDto = commentMapper.mapToDto(createdComment)

        val commentId = outputCommentDto.id
        val location = URI("/api/posts/${createdComment.post.id}/comments/$commentId")

        return ResponseEntity.created(location).body(outputCommentDto)
    }

}