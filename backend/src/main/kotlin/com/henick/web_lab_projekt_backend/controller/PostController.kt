package com.henick.web_lab_projekt_backend.controller

import com.henick.web_lab_projekt_backend.dto.ReadPostDto
import com.henick.web_lab_projekt_backend.entity.Post
import com.henick.web_lab_projekt_backend.service.PostService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/posts")
class PostController(private val postService: PostService) {

    @GetMapping("/")
    fun getAllPosts(): ResponseEntity<List<ReadPostDto>>{
        val posts = postService.getAll()
        return ResponseEntity.ok(posts)
    }
    @GetMapping("/{id}")
    fun getPostById(): ResponseEntity<ReadPostDto>

}