package com.henick.web_lab_projekt_backend.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.validation.constraints.Max
import jakarta.validation.constraints.NotNull
import java.time.LocalDateTime

@Entity
class Comment(
    @Column(nullable = false)
    @NotNull
    @Max(255)
    var username: String,
    @Column(nullable = false)
    @NotNull
    @Max(4000)
    var content: String,
    @ManyToOne
    @JoinColumn(name = "post_id")
    val post: Post,
    @Column(name = "created_at", nullable = false)
    var createdAt: LocalDateTime? = null,
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
)