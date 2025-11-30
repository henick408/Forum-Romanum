package com.henick.web_lab_projekt_backend.mapper.impl

import com.henick.web_lab_projekt_backend.dto.PostBasicDto
import com.henick.web_lab_projekt_backend.entity.Post
import com.henick.web_lab_projekt_backend.mapper.CategoryMapper
import com.henick.web_lab_projekt_backend.mapper.PostMapper
import org.springframework.stereotype.Component

@Component
class PostMapperImpl(private val categoryMapper: CategoryMapper) : PostMapper {
    override fun mapToBasicDto(post: Post): PostBasicDto {
        val categoryDto = categoryMapper.mapToDto(post.category)
        return PostBasicDto(
            username = post.username,
            title = post.title,
            content = post.content,
            category = categoryDto,
            createdAt = post.createdAt,
            id = post.id
        )
    }

    override fun mapFromBasicDto(postDto: PostBasicDto): Post {
        val category = categoryMapper.mapFromDto(postDto.category)
        return Post(
            username = postDto.username,
            title = postDto.title,
            content = postDto.content,
            category = category,
            createdAt = postDto.createdAt,
            id = postDto.id
        )
    }
}