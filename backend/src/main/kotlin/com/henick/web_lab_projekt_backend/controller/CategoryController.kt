package com.henick.web_lab_projekt_backend.controller

import com.henick.web_lab_projekt_backend.dto.CategoryDto
import com.henick.web_lab_projekt_backend.mapper.CategoryMapper
import com.henick.web_lab_projekt_backend.service.CategoryService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/categories")
class CategoryController(private val categoryService: CategoryService, private val categoryMapper: CategoryMapper) {

    @GetMapping()
    fun getAllCategories(): ResponseEntity<List<CategoryDto>> {
        val categories = categoryService.getAll();
        val categoryDtos = categories.map{category -> categoryMapper.mapToDto(category)}.toList()
        return ResponseEntity.ok(categoryDtos)
    }

    @GetMapping("/{id}")
    fun getCategoryById(@PathVariable id: Long): ResponseEntity<CategoryDto> {
        val category = categoryService.getById(id)
        if (category == null) {
            return ResponseEntity.notFound().build()
        }
        val categoryDto = categoryMapper.mapToDto(category)
        return ResponseEntity.ok(categoryDto)
    }

}