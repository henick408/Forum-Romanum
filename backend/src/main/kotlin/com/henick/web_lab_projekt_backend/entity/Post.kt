package com.henick.web_lab_projekt_backend.entity

import jakarta.persistence.CascadeType
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.OneToMany
import jakarta.validation.constraints.Max
import jakarta.validation.constraints.NotNull
import java.time.LocalDateTime

@Entity
class Post(
    @Column(nullable = false)
    @NotNull
    @Max(255)
    var username: String,
    @Column(nullable = false)
    @NotNull
    @Max(255)
    var title: String,
    @Column(nullable = false)
    @NotNull
    @Max(4000)
    var content: String,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    var category: Category,
    @OneToMany(
        mappedBy = "post",
        cascade = [CascadeType.ALL],
        orphanRemoval = true
    )
    val comments: MutableList<Comment> = mutableListOf(),
    @Column(name = "created_at", nullable = false)
    var createdAt: LocalDateTime? = null,
    @Column(name = "updated_at", nullable = false)
    var updatedAt: LocalDateTime? = null,
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
)