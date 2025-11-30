package com.henick.web_lab_projekt_backend.dto

import com.henick.web_lab_projekt_backend.entity.Category
import com.henick.web_lab_projekt_backend.entity.Comment
import java.time.LocalDateTime

data class ReadPostDto(
    val username: String,
    var title: String,
    var content: String,
    var category: Category,
    val comments: List<Comment>,
    val createdAt: LocalDateTime,
    val id: Long? = null
)