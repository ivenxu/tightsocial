/*
 * The MIT License
 *
 * Copyright 2015 tightsocial.org.
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

import java.io.Serializable;
import java.util.Collections;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import org.tightsocial.common.domain.EntityNotExistException;
import org.tightsocial.common.sharedcontract.BusinessException;
import org.tightsocial.common.sharedcontract.identification.LoginDescriptor;

import org.tightsocial.identification.model.*;


/**
 *
 * @author Iven Xu <ivenxu at gmail.com>
 */

@ApplicationScoped
public class IDService implements Serializable{
    private static final long serialVersionUID = -2047448972662221884L;
    
    @Inject
    private UserRepository userRepository;
    
    @Inject
    private TenantRepository tenantRepository;
    
    @Transactional
    public void abc(){
        try {
            User u = new User("Bookey");
            this.userRepository.add(u);
            User u2 = this.userRepository.ofId(u.getId());
            
            Tenant t = new Tenant(u);
            this.tenantRepository.add(t);
            u.attachToTenant(t);
            Tenant t2 = this.tenantRepository.ofId(t.getId());
        } catch (EntityNotExistException ex) {
            Logger.getLogger(IDService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    @Transactional
    public void registUser(LoginDescriptor aLoginDescriptor) throws BusinessException{
        if (userAlreadyExist(aLoginDescriptor)){
             throw new BusinessException("User's already existed.");
        }
        if (ModelLoginType.UserPassword.equals(ModelLoginType.fromSharedContract(aLoginDescriptor.getLoginType()))){
            User u = new User(aLoginDescriptor.getName());
            LoginCredential lc = LoginCredential.fromLoginDescriptor(aLoginDescriptor);
            u.registCredential(lc);
            this.userRepository.add(u);
        }
    }
    
    @Transactional
    public void registerLogin(long userId, LoginDescriptor aLoginDescriptor) throws BusinessException{
        User user = null;
        try {
            user = this.userRepository.ofId(userId);
            user.registCredential(LoginCredential.fromLoginDescriptor(aLoginDescriptor));
        } catch(EntityNotExistException ex){
            throw new BusinessException(ex.getMessage(), ex);
        }
    }
    
    @Transactional
    public void startTenancy(long userId) throws BusinessException{
        try {
            User user = this.userRepository.ofId(userId);
            Tenant tenant = Tenant.initiate(user);
            user.attachToTenant(tenant);
            this.tenantRepository.add(tenant);
        } catch (EntityNotExistException ex) {
            throw new BusinessException(ex.getMessage(), ex);
        }
    }
    
    @Transactional
    public List<Tenant> findTenantsByCreator(LoginDescriptor aSocialLoginInfo){
        User user;
        try {
            user = this.userRepository.byCredentialIDAndType(aSocialLoginInfo.getId(), ModelLoginType.fromSharedContract(aSocialLoginInfo.getLoginType()));
        } catch (EntityNotExistException ex) {
            return Collections.EMPTY_LIST;
        }
        
        return this.tenantRepository.createdBy(user.getId());
    }
    
    private boolean userAlreadyExist(LoginDescriptor aLoginDescriptor){
        try {
            this.userRepository.byCredentialIDAndType(aLoginDescriptor.getId(), ModelLoginType.fromSharedContract(aLoginDescriptor.getLoginType()));
            return true;
        } catch (EntityNotExistException ene) {
            return false;
        }
    }
}
