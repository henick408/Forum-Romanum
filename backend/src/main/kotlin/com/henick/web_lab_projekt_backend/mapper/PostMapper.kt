package com.henick.web_lab_projekt_backend.mapper

import com.henick.web_lab_projekt_backend.dto.PostBasicDto
import com.henick.web_lab_projekt_backend.dto.PostCreateDto
import com.henick.web_lab_projekt_backend.entity.Post
import org.springframework.stereotype.Component

interface PostMapper {
    fun mapToBasicDto(post: Post): PostBasicDto
    fun mapFromBasicDto(postDto: PostBasicDto): Post

    fun mapToCreateDto(post: Post): PostCreateDto
    fun mapFromCreateDto(postDto: PostCreateDto): Post
}