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
package org.tightsocial.identification.model;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import org.tightsocial.common.domain.ConcurrencySafeEntity;

/**
 *
 * @author Iven Xu <ivenxu at gmail.com>
 */
public class User extends ConcurrencySafeEntity {
    private static final long serialVersionUID = 3308924463771170272L;
    private Map<ModelLoginType, LoginCredential> credentials;    
    private Set<Role> assignedRoles;
    private Set<Tenant> associatedTenants;

    String name;
    
    public User(){
        super();
        assignedRoles = new HashSet<Role>();
        associatedTenants = new HashSet<Tenant>();
        credentials = new HashMap<ModelLoginType, LoginCredential>();
    }
    
    public User(String name){
        this();
        this.name = name;
    }
    
//    public static User newFromSocialLogin(SocialLoginInfo socialLoginInfo){
//        User user = new User(socialLoginInfo.getName());
//        user.addSocialLogin(socialLoginInfo);
//        return user;
//    }
    
    public void assignRole(Role aRole){
        assignedRoles.add(aRole);
    }
    
    public void attachToTenant(Tenant aTenant){
        associatedTenants.add(aTenant);
    }
    
    public void registCredential(LoginCredential credential){
        credentials.put(credential.getLoginType(), credential);
    }


    /**
     * Get the value of credential the user has registered
     *
     * @return the value of credentials
     */
    public Map<ModelLoginType, LoginCredential> credentials() {
        return credentials;
    }

    protected void setID(long id){
        this.id = id;
    }
}
