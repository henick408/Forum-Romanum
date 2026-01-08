package com.henick.web_lab_projekt_backend.repository

import com.henick.web_lab_projekt_backend.entity.Post
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository


interface PostRepository : JpaRepository<Post, Long>{
    fun findPostsByCategoryId(pageable: Pageable, id: Long): Page<Post>
}