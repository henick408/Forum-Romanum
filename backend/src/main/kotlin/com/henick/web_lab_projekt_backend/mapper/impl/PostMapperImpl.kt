package com.henick.web_lab_projekt_backend.mapper.impl

import com.henick.web_lab_projekt_backend.dto.PostBasicDto
import com.henick.web_lab_projekt_backend.entity.Post
import com.henick.web_lab_projekt_backend.mapper.PostMapper
import org.springframework.stereotype.Component

@Component
class PostMapperImpl : PostMapper{
    override fun mapToBasicDto(post: Post): PostBasicDto {
        return PostBasicDto(
            username = post.username,
            title = post.title,
            content = post.content,
            category = post.category,
            createdAt = post.createdAt,
            id = post.id
        )
    }

    override fun mapFromBasicDto(postDto: PostBasicDto): Post {
        return Post(
            username = postDto.username,
            title = postDto.title,
            content = postDto.content,
            category = postDto.category,
            createdAt = postDto.createdAt,
            id = postDto.id
        )
    }
}