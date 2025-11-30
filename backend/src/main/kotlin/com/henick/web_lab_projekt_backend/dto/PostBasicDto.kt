package com.henick.web_lab_projekt_backend.dto

import com.henick.web_lab_projekt_backend.entity.Category
import java.time.LocalDateTime

data class PostBasicDto(
    val username: String,
    var title: String,
    var content: String,
    var category: Category,
    val createdAt: LocalDateTime,
    val id: Long?
    )