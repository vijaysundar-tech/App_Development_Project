package com.example.demo;

import org.testng.Assert;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import java.lang.reflect.*;
import java.util.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

@Listeners(TestResultListener.class)
public class ProjectValidationTests {

    // DAY-1 | Sprint: Package & Layer Architecture Verification

    @Test
    public void t1_verifyBridgeTransactionControllerExists() throws Exception {
        // SRS_REF: Controller Layer - BridgeTransactionController
        Class<?> clazz = Class.forName("com.example.demo.controller.BridgeTransactionController");
        Assert.assertNotNull(clazz);
    }

    @Test
    public void t2_verifyBridgeTransactionServiceExists() throws Exception {
        // SRS_REF: Service Layer - BridgeTransactionService
        Class<?> clazz = Class.forName("com.example.demo.service.BridgeTransactionService");
        Assert.assertNotNull(clazz);
    }

    @Test
    public void t3_verifyBridgeTransactionRepositoryExists() throws Exception {
        // SRS_REF: Repositories - BridgeTransactionRepository
        Class<?> clazz = Class.forName("com.example.demo.repository.BridgeTransactionRepository");
        Assert.assertTrue(clazz.isInterface());
    }

    @Test
    public void t4_verifyBridgeTransactionEntityExists() throws Exception {
        // SRS_REF: Entity Models - BridgeTransaction
        Class<?> clazz = Class.forName("com.example.demo.model.BridgeTransaction");
        Assert.assertNotNull(clazz);
    }

    @Test
    public void t5_verifySecurityConfigExists() throws Exception {
        // SRS_REF: Security Implementation - SecurityConfig
        Class<?> clazz = Class.forName("com.example.demo.config.SecurityConfig");
        Assert.assertNotNull(clazz);
    }

    // DAY-2 | Sprint: Controller HTTP Mapping & Functional CRUD Logic

    @Test
    public void t6_verifyRestControllerAnnotation() throws Exception {
        // SRS_REF: Controller Layer - BridgeTransactionController @RestController
        Class<?> clazz = Class.forName("com.example.demo.controller.BridgeTransactionController");
        Assert.assertTrue(clazz.isAnnotationPresent(RestController.class));
    }

    @Test
    public void t7_verifyRequestMappingPath() throws Exception {
        // SRS_REF: Controller Layer - BridgeTransactionController @RequestMapping
        Class<?> clazz = Class.forName("com.example.demo.controller.BridgeTransactionController");
        Assert.assertEquals(clazz.getAnnotation(RequestMapping.class).value()[0], "/api/transactions");
    }

    @Test
    public void t8_verifyInitiateMethodPostMapping() throws Exception {
        // SRS_REF: Controller Layer - BridgeTransactionController POST /
        Class<?> ctrlClass = Class.forName("com.example.demo.controller.BridgeTransactionController");
        Class<?> dtoClass = Class.forName("com.example.demo.dto.BridgeTransactionDTO");
        Method m = ctrlClass.getDeclaredMethod("initiateBridgeSettlement", dtoClass);
        Assert.assertTrue(m.isAnnotationPresent(PostMapping.class));
    }

    @Test
    public void t9_verifyInitiateMethodRequestBody() throws Exception {
        // SRS_REF: Controller Layer - BridgeTransactionController POST / @RequestBody
        Class<?> ctrlClass = Class.forName("com.example.demo.controller.BridgeTransactionController");
        Class<?> dtoClass = Class.forName("com.example.demo.dto.BridgeTransactionDTO");
        Method m = ctrlClass.getDeclaredMethod("initiateBridgeSettlement", dtoClass);
        Assert.assertTrue(m.getParameters()[0].isAnnotationPresent(RequestBody.class));
    }

    @Test
    public void t10_verifyFetchAllMethodGetMappingAndLogic() throws Exception {
        // SRS_REF: Controller Layer - BridgeTransactionController GET /
        Class<?> ctrlClass = Class.forName("com.example.demo.controller.BridgeTransactionController");
        Method m = ctrlClass.getDeclaredMethod("fetchAllSettlements");
        Assert.assertTrue(m.isAnnotationPresent(GetMapping.class));

        Object controller = ctrlClass.getDeclaredConstructor().newInstance();
        Field serviceField = ctrlClass.getDeclaredField("transactionService");
        serviceField.setAccessible(true);

        Class<?> serviceClass = Class.forName("com.example.demo.service.BridgeTransactionService");
        Object serviceMock = org.mockito.Mockito.mock(serviceClass);

        Class<?> dtoClass = Class.forName("com.example.demo.dto.BridgeTransactionDTO");
        Object mockDto = dtoClass.getDeclaredConstructor().newInstance();

        Method getMethod = serviceClass.getMethod("getAllSettlements");
        org.mockito.Mockito.when(getMethod.invoke(serviceMock)).thenReturn(Collections.singletonList(mockDto));

        serviceField.set(controller, serviceMock);

        ResponseEntity<List<?>> resp = (ResponseEntity<List<?>>) m.invoke(controller);
        Assert.assertEquals(resp.getStatusCode(), HttpStatus.OK);
        Assert.assertEquals(resp.getBody().size(), 1);
    }

    @Test
    public void t11_verifyUpdateMethodPutMappingAndLogic() throws Exception {
        // SRS_REF: Controller Layer - BridgeTransactionController PUT /{id}
        Class<?> ctrlClass = Class.forName("com.example.demo.controller.BridgeTransactionController");
        Class<?> dtoClass = Class.forName("com.example.demo.dto.BridgeTransactionDTO");
        Method m = ctrlClass.getDeclaredMethod("updateSettlementRecord", Long.class, dtoClass);
        Assert.assertTrue(m.isAnnotationPresent(PutMapping.class));

        Object controller = ctrlClass.getDeclaredConstructor().newInstance();
        Field serviceField = ctrlClass.getDeclaredField("transactionService");
        serviceField.setAccessible(true);

        Class<?> serviceClass = Class.forName("com.example.demo.service.BridgeTransactionService");
        Object serviceMock = org.mockito.Mockito.mock(serviceClass);

        Method saveMethod = serviceClass.getMethod("saveSettlement", dtoClass);

        Object input = dtoClass.getDeclaredConstructor().newInstance();
        org.mockito.Mockito.when(saveMethod.invoke(serviceMock, input))
                .thenAnswer(invocation -> {
                    Object arg = invocation.getArgument(0);
                    arg.getClass().getMethod("setBridgeStatus", String.class).invoke(arg, "UPDATED");
                    return arg;
                });

        serviceField.set(controller, serviceMock);

        ResponseEntity<?> resp = (ResponseEntity<?>) m.invoke(controller, 1L, input);
        Assert.assertEquals(resp.getStatusCode(), HttpStatus.OK);

        Object body = resp.getBody();
        Assert.assertEquals(body.getClass().getMethod("getBridgeStatus").invoke(body), "UPDATED");
    }

    @Test
    public void t12_bridgeTransactionDeleteLogic() throws Exception {
        // SRS_REF: Controller Layer - BridgeTransactionController DELETE /{id}
        Class<?> ctrlClass = Class.forName("com.example.demo.controller.BridgeTransactionController");
        Method m = ctrlClass.getDeclaredMethod("removeSettlementRecord", Long.class);

        Object controller = ctrlClass.getDeclaredConstructor().newInstance();
        Field serviceField = ctrlClass.getDeclaredField("transactionService");
        serviceField.setAccessible(true);

        Class<?> serviceClass = Class.forName("com.example.demo.service.BridgeTransactionService");
        Object serviceMock = org.mockito.Mockito.mock(serviceClass);
        serviceField.set(controller, serviceMock);

        ResponseEntity<?> resp = (ResponseEntity<?>) m.invoke(controller, 1L);
        Assert.assertEquals(resp.getStatusCode(), HttpStatus.OK);
        Assert.assertEquals(resp.getBody(), "BridgeTransaction deleted successfully.");
    }

    // DAY-3 | Sprint: Security Annotations & CORS Configuration


    @Test
    public void t13_verifyUserAccessibleMethodPermissions() throws Exception {
        // SRS_REF: Controller Layer - BridgeTransactionController POST /
        Class<?> ctrlClass = Class.forName("com.example.demo.controller.BridgeTransactionController");
        Class<?> dtoClass = Class.forName("com.example.demo.dto.BridgeTransactionDTO");
        Method m = ctrlClass.getDeclaredMethod("initiateBridgeSettlement", dtoClass);

        Object controller = ctrlClass.getDeclaredConstructor().newInstance();
        Field serviceField = ctrlClass.getDeclaredField("transactionService");
        serviceField.setAccessible(true);

        Class<?> serviceClass = Class.forName("com.example.demo.service.BridgeTransactionService");
        Object serviceMock = org.mockito.Mockito.mock(serviceClass);

        Method initMethod = serviceClass.getMethod("initiateSettlement", dtoClass);
        Object respDto = dtoClass.getDeclaredConstructor().newInstance();
        respDto.getClass().getMethod("setId", Long.class).invoke(respDto, 123L);

        Object input = dtoClass.getDeclaredConstructor().newInstance();
        org.mockito.Mockito.when(initMethod.invoke(serviceMock, input)).thenReturn(respDto);
        serviceField.set(controller, serviceMock);

        ResponseEntity<?> resp = (ResponseEntity<?>) m.invoke(controller, input);
        Assert.assertEquals(resp.getStatusCode(), HttpStatus.CREATED);
    }

    @Test
    public void t14_verifyCreateStatusCreatedWithPKAndLogic() throws Exception {
        // SRS_REF: Controller Layer - BridgeTransactionController POST / ResponseEntity
        // status and body
        Class<?> ctrlClass = Class.forName("com.example.demo.controller.BridgeTransactionController");
        Class<?> dtoClass = Class.forName("com.example.demo.dto.BridgeTransactionDTO");
        Method m = ctrlClass.getDeclaredMethod("initiateBridgeSettlement", dtoClass);

        Object controller = ctrlClass.getDeclaredConstructor().newInstance();
        Field serviceField = ctrlClass.getDeclaredField("transactionService");
        serviceField.setAccessible(true);

        Class<?> serviceClass = Class.forName("com.example.demo.service.BridgeTransactionService");
        Object serviceMock = org.mockito.Mockito.mock(serviceClass);

        Method initMethod = serviceClass.getMethod("initiateSettlement", dtoClass);

        Object input = dtoClass.getDeclaredConstructor().newInstance();
        org.mockito.Mockito.when(initMethod.invoke(serviceMock, input))
                .thenAnswer(invocation -> {
                    Object arg = invocation.getArgument(0);
                    arg.getClass().getMethod("setId", Long.class).invoke(arg, 999L);
                    arg.getClass().getMethod("setTransactionReference", String.class).invoke(arg, "BB-TEST-999");
                    return arg;
                });
        serviceField.set(controller, serviceMock);

        ResponseEntity<?> resp = (ResponseEntity<?>) m.invoke(controller, input);

        Assert.assertEquals(resp.getStatusCode(), HttpStatus.CREATED);
        Object body = resp.getBody();
        Assert.assertEquals(body.getClass().getMethod("getId").invoke(body), 999L);
        Assert.assertEquals(body.getClass().getMethod("getTransactionReference").invoke(body), "BB-TEST-999");
    }

    @Test
    public void t15_verifyCrossOriginPresence() throws Exception {
        // SRS_REF: Controller Layer - BridgeTransactionController @CrossOrigin
        Class<?> ctrlClass = Class.forName("com.example.demo.controller.BridgeTransactionController");
        Assert.assertTrue(ctrlClass.isAnnotationPresent(CrossOrigin.class));
    }

    @Test
    public void t16_verifyValidationAnnotationOnRequestBody() throws Exception {
        // SRS_REF: Controller Layer - BridgeTransactionController POST / @Valid
        Class<?> ctrlClass = Class.forName("com.example.demo.controller.BridgeTransactionController");
        Class<?> dtoClass = Class.forName("com.example.demo.dto.BridgeTransactionDTO");
        Method m = ctrlClass.getDeclaredMethod("initiateBridgeSettlement", dtoClass);
        Assert.assertTrue(m.getParameters()[0].isAnnotationPresent(jakarta.validation.Valid.class));
    }

    @Test
    public void t17_verifyPathVariableDetectionAndAccountLogic() throws Exception {
        // SRS_REF: Controller Layer - RecipientAccountController GET /user/{userId}
        Class<?> ctrlClass = Class.forName("com.example.demo.controller.RecipientAccountController");
        Method m = ctrlClass.getDeclaredMethod("listAccountsForOperator", Long.class);
        Assert.assertTrue(m.getParameters()[0].isAnnotationPresent(PathVariable.class));

        Object controller = ctrlClass.getDeclaredConstructor().newInstance();
        Field serviceField = ctrlClass.getDeclaredField("accountService");
        serviceField.setAccessible(true);

        Class<?> serviceClass = Class.forName("com.example.demo.service.RecipientAccountService");
        Object serviceMock = org.mockito.Mockito.mock(serviceClass);

        Class<?> accountClass = Class.forName("com.example.demo.model.RecipientAccount");
        Method builderMethod = accountClass.getMethod("builder");
        Object builderObj = builderMethod.invoke(null);
        builderObj.getClass().getMethod("id", Long.class).invoke(builderObj, 1L);
        builderObj.getClass().getMethod("bankDisplayName", String.class).invoke(builderObj, "BridgeBank");
        Object accountObj = builderObj.getClass().getMethod("build").invoke(builderObj);

        Method getMethod = serviceClass.getMethod("getOperatorAccounts", Long.class);
        org.mockito.Mockito.when(getMethod.invoke(serviceMock, 1L))
                .thenReturn(Collections.singletonList(accountObj));
        serviceField.set(controller, serviceMock);

        ResponseEntity<?> resp = (ResponseEntity<?>) m.invoke(controller, 1L);
        Assert.assertNotNull(resp.getBody());
    }

    // DAY-4 | Sprint: Repository Layer, Exception Handling & DB Constraints

    @Test
    public void t18_verifyRepositoryIsInterface() throws Exception {
        // SRS_REF: Repositories - BridgeTransactionRepository
        Class<?> clazz = Class.forName("com.example.demo.repository.BridgeTransactionRepository");
        Assert.assertTrue(clazz.isInterface());
    }

    @Test
    public void t19_verifyRepositoryExtendsJpa() throws Exception {
        // SRS_REF: Repositories - BridgeTransactionRepository JpaRepository
        Class<?> repoClass = Class.forName("com.example.demo.repository.BridgeTransactionRepository");
        Assert.assertTrue(org.springframework.data.jpa.repository.JpaRepository.class.isAssignableFrom(repoClass));
    }

    @Test
    public void t20_verifyExceptionHandlerAnnotation() throws Exception {
        // SRS_REF: Exception Handling - GlobalExceptionHandler @RestControllerAdvice
        Class<?> clazz = Class.forName("com.example.demo.exception.GlobalExceptionHandler");
        Assert.assertTrue(clazz.isAnnotationPresent(RestControllerAdvice.class));
    }

    @Test
    public void t21_verifyExceptionHandlerReturnAndStatusLogic() throws Exception {
        // SRS_REF: Exception Handling - GlobalExceptionHandler
        // BridgeTransactionNotFoundException
        Class<?> handlerClass = Class.forName("com.example.demo.exception.GlobalExceptionHandler");
        Class<?> exClass = Class.forName("com.example.demo.exception.BridgeTransactionNotFoundException");

        Object handler = handlerClass.getDeclaredConstructor().newInstance();
        Object ex = exClass.getDeclaredConstructor(String.class).newInstance("Simulation link broken");

        Method handlerMethod = handlerClass.getDeclaredMethod("handleMissingSettlement", exClass);
        ResponseEntity<?> resp = (ResponseEntity<?>) handlerMethod.invoke(handler, ex);
        Assert.assertEquals(resp.getStatusCode(), HttpStatus.NOT_FOUND);
    }

    @Test
    public void t22_verifyCustomExceptionLogicPropagation() throws Exception {
        // SRS_REF: Exception Handling - GlobalExceptionHandler RuntimeException
        Class<?> handlerClass = Class.forName("com.example.demo.exception.GlobalExceptionHandler");

        Object handler = handlerClass.getDeclaredConstructor().newInstance();
        RuntimeException ex = new RuntimeException("Operational failure");

        Method handlerMethod = handlerClass.getDeclaredMethod("handleSimulationError", RuntimeException.class);
        ResponseEntity<?> resp = (ResponseEntity<?>) handlerMethod.invoke(handler, ex);
        Assert.assertEquals(resp.getStatusCode(), HttpStatus.BAD_REQUEST);
    }

    // DAY-5 | Sprint: JWT Security Layer

    @Test
    public void t23_verifyJwtSecretPrivate() throws Exception {
        // SRS_REF: Security & Filter Layer - JwtUtil SECRET_KEY
        Class<?> clazz = Class.forName("com.example.demo.security.JwtUtil");
        Field field = clazz.getDeclaredField("SECRET_KEY");
        Assert.assertTrue(Modifier.isPrivate(field.getModifiers()));
    }

    @Test
    public void t24_verifyJwtGenerateTokenSignature() throws Exception {
        // SRS_REF: Security & Filter Layer - JwtUtil generateToken
        Class<?> clazz = Class.forName("com.example.demo.security.JwtUtil");
        Method m = clazz.getDeclaredMethod("generateToken", String.class, String.class);
        Assert.assertEquals(m.getReturnType(), String.class);
    }

    @Test
    public void t25_verifyJwtValidateTokenSignature() throws Exception {
        // SRS_REF: Security & Filter Layer - JwtUtil validateToken
        Class<?> clazz = Class.forName("com.example.demo.security.JwtUtil");
        Method m = clazz.getDeclaredMethod("validateToken", String.class);
        Assert.assertEquals(m.getReturnType(), Boolean.class);
    }

    // DAY-6 | Sprint: Entity Mapping, Relationships & High Precision Data

    @Test
    public void t26_verifyTableMappingName() throws Exception {
        // SRS_REF: Entity Models - BridgeTransaction @Table
        Class<?> clazz = Class.forName("com.example.demo.model.BridgeTransaction");
        jakarta.persistence.Table table = clazz.getAnnotation(jakarta.persistence.Table.class);
        Assert.assertEquals(table.name(), "tbl_transactions");
    }

    @Test
    public void t27_verifyColumnNotNullConstraints() throws Exception {
        // SRS_REF: Entity Models - BridgeTransaction @Column(nullable = false)
        Class<?> clazz = Class.forName("com.example.demo.model.BridgeTransaction");
        Field f = clazz.getDeclaredField("transactionReference");
        jakarta.persistence.Column col = f.getAnnotation(jakarta.persistence.Column.class);
        Assert.assertFalse(col.nullable());
    }

    @Test
    public void t28_verifySecurityFilterChainBean() throws Exception {
        // SRS_REF: Configuration & Security Layer - SecurityConfig securityFilterChain
        Class<?> clazz = Class.forName("com.example.demo.config.SecurityConfig");
        Method m = clazz.getDeclaredMethod("securityFilterChain",
                org.springframework.security.config.annotation.web.builders.HttpSecurity.class);
        Assert.assertTrue(m.isAnnotationPresent(org.springframework.context.annotation.Bean.class));
    }

    @Test
    public void t29_verifyPasswordEncoderPresence() throws Exception {
        // SRS_REF: Configuration & Security Layer - SecurityConfig passwordEncoder
        Class<?> clazz = Class.forName("com.example.demo.config.SecurityConfig");
        Method m = clazz.getDeclaredMethod("passwordEncoder");
        Assert.assertTrue(m.isAnnotationPresent(org.springframework.context.annotation.Bean.class));
    }

    @Test
    public void t30_verifyBridgeTransactionRelationshipWithAsset() throws Exception {
        // SRS_REF: Entity Models - BridgeTransaction asset ManyToOne
        Class<?> clazz = Class.forName("com.example.demo.model.BridgeTransaction");
        Field f = clazz.getDeclaredField("asset");
        Assert.assertTrue(f.isAnnotationPresent(jakarta.persistence.ManyToOne.class));
    }

    @Test
    public void t31_verifyBridgeTransactionRelationshipWithAccount() throws Exception {
        // SRS_REF: Entity Models - BridgeTransaction account ManyToOne
        Class<?> clazz = Class.forName("com.example.demo.model.BridgeTransaction");
        Field f = clazz.getDeclaredField("account");
        Assert.assertTrue(f.isAnnotationPresent(jakarta.persistence.ManyToOne.class));
    }

    @Test
    public void t32_verifyUserWalletRelationshipWithUser() throws Exception {
        // SRS_REF: Entity Models - UserWallet user ManyToOne
        Class<?> clazz = Class.forName("com.example.demo.model.UserWallet");
        Field f = clazz.getDeclaredField("user");
        Assert.assertTrue(f.isAnnotationPresent(jakarta.persistence.ManyToOne.class));
    }
}