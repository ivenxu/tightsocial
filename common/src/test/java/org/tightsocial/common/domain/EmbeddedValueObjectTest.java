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
package org.tightsocial.common.domain;

import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.experimental.categories.Category;
import org.tightsocial.testcategory.UnitTests;

/**
 *
 * @author Iven Xu <ivenxu at gmail.com>
 */
@Category(UnitTests.class)
public class EmbeddedValueObjectTest {
    
    public EmbeddedValueObjectTest() {
    }

    /**
     * Test of toString method, of class EmbeddedValueObject.
     */
    @Test
    public void testToString() {
        System.out.println("toString");
        EmbeddableValueObjectImpl2 instance = new EmbeddableValueObjectImpl2("hello", SomeEnum.A, null);
        String result = instance.toString();
        System.out.println("toString(): " + result);
        
        assertTrue(!result.isEmpty());
    }

    /**
     * Test of equals method, of class EmbeddedValueObject.
     */
    @Test
    public void testEquals() {
        System.out.println("equals");
        Object otherObj = new EmbeddableValueObjectImpl();
        EmbeddedValueObject instance = new EmbeddableValueObjectImpl();
        boolean expResult = true;
        boolean result = instance.equals(otherObj);
        assertEquals(expResult, result);
        
        expResult = false;
        result = instance.equals(null);
        assertEquals(expResult, result);

    }
    
      @Test
    public void testComplexObjectEquals() {
        System.out.println("equals a little complex");
        final String SOMESTRING = "hello";
        EmbeddableValueObjectImpl2 obj1 = new EmbeddableValueObjectImpl2(SOMESTRING, SomeEnum.A, null);
        EmbeddableValueObjectImpl2 obj2 = new EmbeddableValueObjectImpl2(SOMESTRING, SomeEnum.A, null);

        assertTrue(obj1.equals(obj2));       
        EmbeddableValueObjectImpl2 obj3 = new EmbeddableValueObjectImpl2(SOMESTRING, SomeEnum.B, null);
        assertTrue("Enum part is different, the resould should be FALSE.", !obj1.equals(obj3));
        RefTypeInValue aRefTypeInValue = new RefTypeInValue();
        EmbeddableValueObjectImpl2 obj4 = new EmbeddableValueObjectImpl2(SOMESTRING, SomeEnum.B, aRefTypeInValue);
        EmbeddableValueObjectImpl2 obj5 = new EmbeddableValueObjectImpl2(SOMESTRING, SomeEnum.B, aRefTypeInValue);
        assertTrue(obj4.equals(obj5));         
        assertTrue("Compare NULL to a real reference value, should return FALSE", !obj5.equals(obj3)); 


    }

    /**
     * Test of hashCode method, of class EmbeddedValueObject.
     */
    @Test
    public void testHashCode() {
        System.out.println("hashCode");
        final String SOMESTRING = "hello";
        RefTypeInValue aRefTypeInValue = new RefTypeInValue();
        EmbeddableValueObjectImpl2 obj1 = new EmbeddableValueObjectImpl2(SOMESTRING, SomeEnum.B, aRefTypeInValue);
        EmbeddableValueObjectImpl2 obj2 = new EmbeddableValueObjectImpl2(SOMESTRING, SomeEnum.B, aRefTypeInValue);
        EmbeddableValueObjectImpl2 obj3 = new EmbeddableValueObjectImpl2(SOMESTRING, SomeEnum.A, aRefTypeInValue);
        int hashcode1 = obj1.hashCode();
        int hashcode2 = obj2.hashCode();
        int hashcode3 = obj3.hashCode();
        System.out.println("hash code of obj1: " + hashcode1);
        System.out.println("hash code of obj2: " + hashcode2);
        System.out.println("hash code of obj3: " + hashcode3);
        assertTrue("one part difference cause differnece.", hashcode1 != hashcode3);

    }


    public class EmbeddableValueObjectImpl extends EmbeddedValueObject {
    }
    
    public final class EmbeddableValueObjectImpl2 extends EmbeddedValueObject {
        final String aStringValue;
        final RefTypeInValue aRefTypeInValue;
        private final SomeEnum anEnumValue;
        public EmbeddableValueObjectImpl2(String aStringValue, SomeEnum anEnumValue, RefTypeInValue aRefTypeInValue){
            this.aStringValue = aStringValue;
            this.anEnumValue = anEnumValue;
            this.aRefTypeInValue = aRefTypeInValue;
        }
    }
    
    public static class RefTypeInValue{
        
    }
    
    public static enum SomeEnum{
        A,
        B,
        C
    }
}
