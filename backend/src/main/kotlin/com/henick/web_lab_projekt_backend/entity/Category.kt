package com.henick.web_lab_projekt_backend.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.OneToMany
import jakarta.validation.constraints.Max
import jakarta.validation.constraints.NotNull

@Entity
class Category(
    @Column(nullable = false, unique = true)
    @NotNull
    @Max(255)
    var name: String,
    @OneToMany(
        mappedBy = "category"
    )
    val posts: MutableList<Post> = mutableListOf(),
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
)