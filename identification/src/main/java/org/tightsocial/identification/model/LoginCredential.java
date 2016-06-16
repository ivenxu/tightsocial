/*
 * The MIT License
 *
 * Copyright 2016 hsntech.com.
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

import org.tightsocial.common.domain.EmbeddedValueObject;
import org.tightsocial.common.sharedcontract.identification.LoginDescriptor;


/**
 *
 * @author Iven Xu
 */
public final class LoginCredential extends EmbeddedValueObject {
    private String identifier;
    private String secret;
    private String salt;
    private ModelLoginType loginType;
    
    public LoginCredential(){
        super();
    }

    public LoginCredential(String identifier, String secret, ModelLoginType loginType) {
        this();
        this.identifier = identifier;
        this.secret = secret;
        this.loginType = loginType;
    }
    
    
    public static LoginCredential fromLoginDescriptor(LoginDescriptor aLoginDescriptor){
        return new LoginCredential(aLoginDescriptor.getId(), aLoginDescriptor.getSecret(), ModelLoginType.fromSharedContract(aLoginDescriptor.getLoginType()));
    }

    public String getIdentifier() {
        return identifier;
    }

    public String getSecret() {
        return secret;
    }

    public ModelLoginType getLoginType() {
        return loginType;
    }
    
}
