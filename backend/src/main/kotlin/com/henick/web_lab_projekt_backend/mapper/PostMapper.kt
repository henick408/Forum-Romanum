package com.henick.web_lab_projekt_backend.mapper

import com.henick.web_lab_projekt_backend.dto.ReadPostDto
import com.henick.web_lab_projekt_backend.entity.Post
import org.springframework.stereotype.Component

interface PostMapper {
    fun mapToReadDto(post: Post): ReadPostDto
    fun mapFromReadDto(postDto: ReadPostDto): Post
}