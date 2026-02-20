package com.campus.campus.dto;

import com.campus.campus.enums.Role;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    @NotBlank
    private String name;

    @Email
    private String email;

    private String phone;

    @NotBlank
    @Size(min = 6)
    private String password;

    private Role role;

    private String departmentName;
}
