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
import javax.inject.Inject;
import org.apache.deltaspike.testcontrol.api.junit.CdiTestRunner;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.experimental.categories.Category;
import org.junit.runner.RunWith;
import org.tightsocial.identification.model.ObjectFactory;
import org.tightsocial.identification.model.SocialLoginInfo;
import org.tightsocial.identification.model.Tenant;
import org.tightsocial.identification.port.adapter.mapper.SocialLoginInfoMapper;
import org.tightsocial.identification.port.adapter.persistence.DBTestBase;
import org.tightsocial.testcategory.IntegrationTests;

/**
 *
 * @author Iven Xu <ivenxu at gmail.com>
 */
@RunWith(CdiTestRunner.class)
@Category(IntegrationTests.class)
public class IDServiceHeavyTest extends DBTestBase {
    
    @Inject
    IDService idService;
    
//    EntityManagerFactory emf;
//    EntityManager em;

    
    public IDServiceHeavyTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {

    }
    
    @AfterClass
    public static void tearDownClass() {
    }
    
//    @Before
//    public void setUp() {
//        emf = Persistence.createEntityManagerFactory("identification");
//        em = emf.createEntityManager();
//        ApplicationMockManager applicationMockManager = BeanProvider.getContextualReference(ApplicationMockManager.class);
//        applicationMockManager.addMock(new MockEntityManagerFactory(em));
//        em.getTransaction().begin();
//    }
//    
//    @After
//    public void tearDown() {
//        em.getTransaction().commit();
//        em.close();
//        emf.close();
//    }


    
    @Test
    public void testAHeavyMethod(){
        System.out.println("a heavy method");
        idService.abc();
    }
    
        /**
     * Test of Tenancy Registration. Start a tenancy straight away if there's no tenancy started before by this user (login)
     */
//    @Test
//    public void testStartTenancy() {
//        System.out.println("Start tenancy straight away.");
//        SocialLoginInfo socialLoginInfo = ObjectFactory.newUniqueSocialLogin();
//        org.tightsocial.common.sharedcontract.identification.LoginDescriptor socialLoginforContract = 
//                SocialLoginInfoMapper.toContractObject(socialLoginInfo);
//        List<Tenant> tenants = this.idService.findTenantsByCreator(socialLoginforContract);
//        assertTrue(tenants == null || tenants.isEmpty());
//        
//        this.idService.startTenancy(socialLoginforContract);
//        
//        tenants = this.idService.findTenantsByCreator(socialLoginforContract);
//        assertTrue(tenants != null && !tenants.isEmpty());
//    }

    /**
     * Test of startTenancy method, of class IDService.
     */
//    @Test
//    public void testStartTenancy() {
//        System.out.println("startTenancy");
//        FacebookUserInfo aFacebookUserInfo = null;
//        IDService instance = new IDService();
//        instance.startTenancy(aFacebookUserInfo);
//        // TODO review the generated test code and remove the default call to fail.
//        fail("The test case is a prototype.");
//    }
    
}
