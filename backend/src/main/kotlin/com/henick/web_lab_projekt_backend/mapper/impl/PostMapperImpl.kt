package com.henick.web_lab_projekt_backend.mapper.impl

import com.henick.web_lab_projekt_backend.dto.ReadPostDto
import com.henick.web_lab_projekt_backend.entity.Category
import com.henick.web_lab_projekt_backend.entity.Post
import com.henick.web_lab_projekt_backend.mapper.PostMapper
import org.springframework.stereotype.Component
import java.time.LocalDateTime

@Component
class PostMapperImpl : PostMapper{
    override fun mapToReadDto(post: Post): ReadPostDto {
        val dto = ReadPostDto(

        )
    }

    override fun mapFromReadDto(postDto: ReadPostDto): Post {
        TODO("Not yet implemented")
    }
}