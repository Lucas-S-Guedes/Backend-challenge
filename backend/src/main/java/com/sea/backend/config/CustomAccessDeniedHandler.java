package com.sea.backend.config;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;


//Tentando handle para permissão
@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException, ServletException {


        response.setStatus(HttpServletResponse.SC_FORBIDDEN);

        response.setContentType("application/json");

        response.getWriter().write("{\"message\": \"Você não tem permissão\"}");
        response.getWriter().flush();
    }
}
