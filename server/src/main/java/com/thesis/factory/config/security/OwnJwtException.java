package com.thesis.factory.config.security;

import org.springframework.http.HttpStatus;

public class OwnJwtException extends  RuntimeException {

    public OwnJwtException(String expired_or_invalid_jwt_token, HttpStatus internalServerError) {
        super(expired_or_invalid_jwt_token+internalServerError);
    }
}
