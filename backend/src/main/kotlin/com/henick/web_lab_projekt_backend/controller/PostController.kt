package com.henick.web_lab_projekt_backend.controller

import com.henick.web_lab_projekt_backend.dto.PostBasicDto
import com.henick.web_lab_projekt_backend.mapper.PostMapper
import com.henick.web_lab_projekt_backend.service.PostService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/posts")
class PostController(private val postService: PostService, private val postMapper: PostMapper) {

    @GetMapping
    fun getAllPosts(): ResponseEntity<List<PostBasicDto>>{
        val posts = postService.getAll()
        val postBasicDtos = posts.stream().map{post -> postMapper.mapToBasicDto(post)}.toList()
        return ResponseEntity.ok(postBasicDtos)
    }
    @GetMapping("/{id}")
    fun getPostById(@PathVariable id: Long): ResponseEntity<PostBasicDto> {
        val post = postService.getById(id)
        if (post == null){
            return ResponseEntity.notFound().build()
        }
        return ResponseEntity.ok(postMapper.mapToBasicDto(post))
    }

}