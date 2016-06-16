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

import org.tightsocial.identification.model.passwordhash.PasswordHashService;
import org.tightsocial.identification.model.passwordhash.PasswordNotHashService;

/**
 *
 * @author Iven Xu
 */
public enum ModelLoginType {
    Facebook,
    Pinterest,
    Linkedin,
    Google,
    UserPassword{
        @Override
        public PasswordHashService hasService(){
            return new PasswordNotHashService();
        }
    };
    
    public PasswordHashService hasService(){
        return new PasswordNotHashService();
    }
    
    public org.tightsocial.common.sharedcontract.identification.LoginType toSharedContract(){
        switch (this) {
            case Facebook:
                return org.tightsocial.common.sharedcontract.identification.LoginType.Facebook;
            case Pinterest:
                return org.tightsocial.common.sharedcontract.identification.LoginType.Pinterest;
            case Linkedin:
                return org.tightsocial.common.sharedcontract.identification.LoginType.Linkedin;
            case Google:
                return org.tightsocial.common.sharedcontract.identification.LoginType.Google;
            default:
                return org.tightsocial.common.sharedcontract.identification.LoginType.UserPassword;
        }
    }
    
    public static ModelLoginType fromSharedContract(org.tightsocial.common.sharedcontract.identification.LoginType sharedContract){
        switch (sharedContract) {
            case Facebook:
                return Facebook;
            case Pinterest:
                return Pinterest;
            case Linkedin:
                return Linkedin;
            case Google:
                return Google;
            default:
                return UserPassword;
        }
    }
}
