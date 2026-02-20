package com.campus.campus.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Role {
    STUDENT,
    STAFF,
    ADMIN;

    @JsonCreator
    public static Role fromString(String value) {
        if (value == null)
            return null;
        return Role.valueOf(value.toUpperCase());
    }
}
