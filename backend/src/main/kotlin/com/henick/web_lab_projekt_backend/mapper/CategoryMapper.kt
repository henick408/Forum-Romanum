package com.henick.web_lab_projekt_backend.mapper

import com.henick.web_lab_projekt_backend.dto.CategoryCreatePostDto
import com.henick.web_lab_projekt_backend.dto.CategoryDto
import com.henick.web_lab_projekt_backend.entity.Category

interface CategoryMapper {
    fun mapToDto(category: Category): CategoryDto
    fun mapFromDto(categoryDto: CategoryDto): Category

    fun mapToCreatePostDto(category: Category): CategoryCreatePostDto
    fun mapFromCreatePostDto(categoryDto: CategoryCreatePostDto): Category
}