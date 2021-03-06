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

import java.io.Serializable;
import java.util.UUID;

/**
 *
 * @author Iven Xu <ivenxu at gmail.com>
 */
public abstract class IdentifiedDomainObject implements Serializable {
    private static final long serialVersionUID = 4869998477309709163L;
    
    protected long id;
    protected UUID uid;
    
    public IdentifiedDomainObject(){
        uid = UUID.randomUUID();
    }

    public long getId() {
        return id;
    }

    public UUID getUid() {
        return uid;
    }

    @Override
    public String toString() {
        return "IdentifiedDomainObject{" + "id=" + id + ", uid=" + uid + '}';
    }

    @Override
    public int hashCode() {
        return uid.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final IdentifiedDomainObject other = (IdentifiedDomainObject) obj;
        return this.uid.equals(other.uid);
    }
    

}
