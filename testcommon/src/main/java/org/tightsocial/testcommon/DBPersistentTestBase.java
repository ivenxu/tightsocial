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
package org.tightsocial.testcommon;

import java.util.List;
import javax.persistence.*;
import org.junit.*;
import static org.junit.Assert.*;
import org.tightsocial.common.domain.IdentifiedDomainObject;

/**
 *
 * @author Iven Xu <ivenxu at gmail.com>
 */
public abstract class DBPersistentTestBase {
    protected EntityManagerFactory emf;
    protected EntityManager em;
    protected EntityTransaction et;
    
    protected abstract String majorPUName();
    
    protected abstract void attachMockEntityManagerFactoryToMock();
    
    protected void createEntitytManagerFactory(){
        emf = Persistence.createEntityManagerFactory(majorPUName());
    }
    protected void createEntityManager(){
        em = emf.createEntityManager();
    }
    
    protected void beginTransaction(boolean forceRollbackFirst){
        if (et != null && et.isActive()) {
            if (forceRollbackFirst){
                et.rollback();
            } else {
                return;
            }
        }
        et = em.getTransaction();
        et.begin();
    }
    
    protected void beginTransaction(){
        beginTransaction(false);
    }
    
    protected void commitTransaction(){
        if (et != null && et.isActive()){
            et.commit();
        }
    }
    
    protected void closeEntityManager(){
        if (em != null && em.isOpen()){
            em.close();
            em = null;
        }
    }
    
    protected void closeEntityManagerFactory(){
         if (emf != null && emf.isOpen()){
            emf.close();
            emf = null;
        }
    }
    
    protected void assertID(IdentifiedDomainObject domainObject){
        assertTrue(domainObject.getClass().toString() + "has no identity.", domainObject.getId() > 0);
    }
    
    protected void assertNotEmptyList(List<?> list){
        assertTrue("Expecting a list has items, acture list is empty or null.", list != null && !list.isEmpty());
    }
    
    @Before
    public void setUp() {
       createEntitytManagerFactory();
       createEntityManager();
       attachMockEntityManagerFactoryToMock();
       beginTransaction();
    }
    
    @After
    public void tearDown() {
        commitTransaction();
        closeEntityManager();
        closeEntityManagerFactory();
    }
}
