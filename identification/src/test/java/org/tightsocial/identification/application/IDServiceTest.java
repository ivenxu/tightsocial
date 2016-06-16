/*
 * The MIT License
 *
 * Copyright 2016 tightsocial.org.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
package org.tightsocial.identification.application;

import java.util.List;
import java.util.UUID;
import javax.inject.Inject;
import junit.framework.Assert;
import org.apache.deltaspike.core.api.provider.BeanProvider;
import org.apache.deltaspike.testcontrol.api.junit.CdiTestRunner;
import org.apache.deltaspike.testcontrol.api.mock.ApplicationMockManager;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Rule;
import org.junit.Test;
import org.junit.experimental.categories.Category;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.tightsocial.common.domain.EntityNotExistException;
import org.tightsocial.common.sharedcontract.BusinessException;
import org.tightsocial.common.sharedcontract.identification.LoginDescriptor;
import org.tightsocial.identification.model.*;
import org.tightsocial.identification.port.adapter.persistence.*;
import org.tightsocial.testcategory.UnitTests;

/**
 *
 * @author Iven Xu <ivenxu at gmail.com>
 */
@RunWith(CdiTestRunner.class)
@Category(UnitTests.class)
public class IDServiceTest {
    
    @Inject
    IDService idService;
    
    @Rule public ExpectedException thrown= ExpectedException.none();
    
    ApplicationMockManager applicationMockManager;
    
    public IDServiceTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
        ApplicationMockManager applicationMockManager = BeanProvider.getContextualReference(ApplicationMockManager.class);
        applicationMockManager.addMock(new TenantMockRepository());
        applicationMockManager.addMock(new UserMockRepository());
    }
    
    @AfterClass
    public static void tearDownClass() {
    }
    
    @Before
    public void setUp() {
//        applicationMockManager = BeanProvider.getContextualReference(ApplicationMockManager.class);
//        applicationMockManager.addMock(new TenantMockRepository());
//        applicationMockManager.addMock(new UserMockRepository());
    }
    
    @After
    public void tearDown() {
    }

    /**
     * Test of abc method, of class IDService.
     */
    @Test
    public void testAbc() {
        System.out.println("abc");
        idService.abc();
        ApplicationMockManager applicationMockManager = BeanProvider.getContextualReference(ApplicationMockManager.class);
        TenantRepository repository = applicationMockManager.getMock(TenantDBRepository.class);
        // TODO review the generated test code and remove the default call to fail.
    }
    
    @Test
    public void testRegistLocalUser() throws EntityNotExistException, BusinessException{
        System.out.println("testRegistUser");
        LoginDescriptor descriptor = randomLocalLoginDescriptor();
        idService.registUser(descriptor);
        User u = this.getUserMockRepository().byCredentialIDAndType(descriptor.getId(), ModelLoginType.fromSharedContract(descriptor.getLoginType()));
        
        Assert.assertNotNull(u);
        Assert.assertNotNull(u.credentials().get(ModelLoginType.fromSharedContract(descriptor.getLoginType())));
        Assert.assertSame(u.credentials().get(ModelLoginType.fromSharedContract(descriptor.getLoginType())).getIdentifier(), descriptor.getId());

    }
    
    @Test
    public void testNegativeDuplicatedLoginDescriptor() throws EntityNotExistException, BusinessException{
        thrown.expect(BusinessException.class);
        
        LoginDescriptor descriptor = specifiedLocalLoginDescriptor("hello");
        idService.registUser(descriptor);
        idService.registUser(descriptor);
    }
    
    @Test
    public void testStartTenancy() throws BusinessException{
        long userId = 1L;
        this.getUserMockRepository().add(TestUserFactory.fromID(userId));
        
        idService.startTenancy(userId);
        
        List<Tenant> tenants = this.getTenantMockRepository().createdBy(userId);
        Assert.assertFalse(tenants.isEmpty());
        Assert.assertEquals(tenants.get(0).getCreator().getId(), userId);
    }

    
    private UserMockRepository getUserMockRepository(){
        return this.getMock(UserDBRepository.class);
    }
    
    private TenantMockRepository getTenantMockRepository(){
        return this.getMock(TenantDBRepository.class);
    }
    
    private <R, T> R getMock(Class<T> classT){
        ApplicationMockManager applicationMockManager = BeanProvider.getContextualReference(ApplicationMockManager.class);
        return (R) applicationMockManager.getMock(classT);
    }
    
    private LoginDescriptor randomLocalLoginDescriptor(){
        return new LoginDescriptor(UUID.randomUUID().toString(), "password", null, null, ModelLoginType.UserPassword.toSharedContract());
    }
    
    private LoginDescriptor specifiedLocalLoginDescriptor(String id){
        return new LoginDescriptor(id, "password", null, null, ModelLoginType.UserPassword.toSharedContract());
    }
}
