package com.henick.web_lab_projekt_backend.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import java.time.LocalDateTime

@Entity
class Comment(
    @Column(nullable = false)
    val username: String,
    @Column(nullable = false)
    var content: String
){
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @Column(nullable = false)
    val createdAt: LocalDateTime = LocalDateTime.now()

}