package com.souldev.cart.controllers;


import com.souldev.cart.entities.Message;
import com.souldev.cart.entities.SubCategory;
import com.souldev.cart.services.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/subcategory")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SubCategoryController {
    
    @Autowired
    private SubCategoryService subCategoryService;

    @GetMapping(value = "/{categoryname}")
    public ResponseEntity<Object> getSubCategories(@PathVariable String categoryname){
        return new ResponseEntity<>(this.subCategoryService.getSubCategoriesByCategory(categoryname), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Message> create(@RequestBody SubCategory subCategory){
        this.subCategoryService.saveSubCategory(subCategory);
        return new ResponseEntity<>(new Message("Creado"),HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<Object> getAllSubCategories(){
        return new ResponseEntity<>(this.subCategoryService.findAll(), HttpStatus.OK);
    }


}
