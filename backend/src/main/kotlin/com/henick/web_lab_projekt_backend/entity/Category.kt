package com.henick.web_lab_projekt_backend.entity

import io.swagger.v3.oas.annotations.media.Schema
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.OneToMany
import jakarta.persistence.PrePersist

@Entity
@Schema(description = "Model kategorii")
class Category(
    @Column(nullable = false, unique = true)
    val name: String,
    @OneToMany(
        mappedBy = "category"
    )
    val posts: MutableList<Post> = mutableListOf(),
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null
)