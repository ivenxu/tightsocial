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
package org.tightsocial.identification.port.adapter.persistence.mappingtest;

import java.util.List;
import java.util.UUID;
import org.tightsocial.common.sharedcontract.identification.LoginType;
import org.apache.deltaspike.testcontrol.api.junit.CdiTestRunner;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.experimental.categories.Category;
import org.junit.runner.RunWith;
import org.tightsocial.identification.model.*;
import org.tightsocial.testcategory.DBRepositoryTests;

/**
 *
 * @author Iven Xu <ivenxu at gmail.com>
 */
@RunWith(CdiTestRunner.class)
@Category(DBRepositoryTests.class)
public class TenantDBRepositoryTest extends DBRepositoryTestBase {    
    
    public TenantDBRepositoryTest() {
    }

    @Test
    public void simpleProperties() {
        System.out.println("TenantDBRepositoryTest.simpleProperties");
        Tenant t = new Tenant();
        this.tenantRepository.add(t);
        assertID(t);
    }
    
    @Test
    public void withAssociations(){        
        System.out.println("TenantDBRepositoryTest.withAssociations");
        User u = new User("Bookey");
        this.userRepository.add(u);
        assertID(u);
        Tenant t = new Tenant(u);
        this.tenantRepository.add(t);
        u.attachToTenant(t);
        assertID(t);
    }
    
    @Test
    public void createdBy(){
        System.out.println("TenantDBRepositoryTest.createdBy");
        User u = new User("Bookey");
        this.userRepository.add(u);
        Tenant t = new Tenant(u);
        this.tenantRepository.add(t);
        List<Tenant> tenants = this.tenantRepository.createdBy(u.getId());
        
        assertNotEmptyList(tenants);
    }
    
}
